// Minimal interfaces/types used by the service
interface DownloadRequestDataI {
  emailme?: boolean;
  [index: string]: string | number | boolean | undefined;
}

interface DownloadCheckResponseI {
  status: string;
  msg: string;
  filename?: string;
  projectname?: string;
  fileext?: string;
}

interface ProgressModalI {
  exposed: {
    setProgress(progress: number): void;
  };
}

// External dependencies provided elsewhere in the app (legacy globals)
declare const fetchHeaderCsrf: HeadersInit;
declare function manageErrors(response: Response): Response;
declare function onErrorSendPrivateEvent(error: unknown): void;
declare function langGen(langKey: string): string;
declare function openLinkInNewTab(url: string, filename?: string): void;
declare function taskExportEmailLink(projectID: string, hash?: string): void;

declare global {
  interface Window {
    alertModal: (options: { type: string; message: string }) => ProgressModalI;
    confirmModal: (options: {
      type: string;
      message: string;
      okButtonText: string;
      onOk: () => void;
    }) => void;
  }
}

/**
 * Escapes special regex characters in a string so it can be used safely in a RegExp.
 * ES6 compatible - uses standard regex replacement.
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Replaces all occurrences of a substring in a string.
 * ES6 compatible polyfill for String.prototype.replaceAll() for older browsers.
 */
function replaceAll(str: string, find: string, replace: string): string {
  // Early return if find is empty - matches native replaceAll behavior
  // (empty string matches between every character)
  if (find === '') {
    return str.split('').join(replace);
  }
  
  // Escape special regex characters and replace globally
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export class DownloadManagerService {
  private static instance: DownloadManagerService | null = null;
  private modal: ProgressModalI | null = null;

  // Make the constructor private to prevent direct instantiation
  private constructor() {}

  // Global access point to the singleton instance
  public static getInstance(): DownloadManagerService {
    if (!DownloadManagerService.instance) {
      DownloadManagerService.instance = new DownloadManagerService();
    }
    return DownloadManagerService.instance;
  }

  /**
   * TypeScript version of legacy downloadRequestHash.
   *
   * Pseudo UI flow:
   * - Show a modal with "Exporting in progress" text and a progress bar at 5%.
   * - If user chose "email me", show a hidden email-info box that can be revealed later.
   * - While the export is running, keep the modal open and update the progress bar.
   */
  public downloadRequestHash(
    projectID: string,
    urlRequest: string,
    dataJson: DownloadRequestDataI,
  ): void {
    const htmlContent1 = `<p style="font-size: 110%;"><b>${langGen('ExportingInProgress')}</b></p>`;
    const htmlContent2 =
      '<div><div class="progress"> <div id="downloadProgress" class="progress-bar progress-bar-striped active" role="progressbar" style="width:5%"> </div> </div></div>';

    let htmlContent = htmlContent1 + htmlContent2;

    if (dataJson.emailme) {
      const emailLink =
        '<div id="emailExportLink" style="margin-bottom: 20px; border: 1px solid var(--colorN60);padding: 8px;background-color: var(--colorN10);display: none;"><p>' +
        langGen('ExportMail1') +
        '</p><button id="emailExportLinkBtn" class="btn btn-base-secondary" onclick="taskExportEmailLink()">' +
        langGen('ExportMail2') +
        '</button></div>';

      // UI: If "email me" is selected, include an informational box telling the user
      //     they can receive a link by email once the export is ready.
      htmlContent = htmlContent1 + emailLink + htmlContent2;
    }

    // UI: Open a progress modal to indicate that the export has started.
    this.modal = window.alertModal({
      type: 'progressbar',
      message: htmlContent,
    });

    fetch(urlRequest, {
      method: 'POST',
      headers: fetchHeaderCsrf,
      body: new URLSearchParams(dataJson as Record<string, string>),
    })
      .then(manageErrors)
      .then((response) => response.text())
      .then((hash) => {
        // UI: Once the backend returns a hash, start polling for completion.
        this.downloadCheckGenerate(projectID, hash, 10);
      })
      .catch((error) => {
        // UI: Inform the user that the export failed (e.g., toast or error modal)
        onErrorSendPrivateEvent(error);
      });
  }

  /**
   * TypeScript version of legacy downloadCheckGenerate.
   *
   * Pseudo UI flow:
   * - Periodically poll the backend for export status.
   * - Update the modal progress bar as long as status === "1" (working).
   * - When status === "2", close/hide the progress modal and open a confirm
   *   dialog allowing the user to click "Download".
   * - When progress reaches 20%, reveal the "email me" box so the user can
   *   request an emailed link instead of waiting.
   * - For errors, show an error modal with the message from the server.
   */
  public downloadCheckGenerate(projectID: string, hash: string, progress: number): void {
    if (!this.modal) {
      // Modal was not initialized correctly; nothing to update.
      return;
    }

    // UI: Update progress bar in the modal.
    this.modal.exposed.setProgress(progress);

    setTimeout(() => {
      fetch(`/api/file/creation/check/${projectID}/${hash}`, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            // UI: Show generic HTTP error
            window.alertModal({
              type: 'error',
              message: `Request failed with status ${response.status}`,
            });
            return null;
          }
          return response.json();
        })
        .then((res: DownloadCheckResponseI) => {

          if (res.status === '2') {
            const downloadUrl = res.msg;

            // UI: Inform the user that the file is now available for download.
            window.confirmModal({
              type: 'info',
              message: langGen('FileAvailable'),
              okButtonText: langGen('Download'),
              onOk: () => {
                const filename =
                  res.filename && res.filename !== ''
                    ? res.filename
                    : `${replaceAll(res.projectname || '', ' ', '_')}${res.fileext || ''}`;
                openLinkInNewTab(downloadUrl, filename);
              },
            });
          } else if (res.status === '1') {
            // UI: Still working – bump progress and keep polling.
            const nextProgress = progress === 100 ? 5 : progress + 5;
            this.downloadCheckGenerate(projectID, hash, nextProgress);

            // When progress reaches 20%, reveal the "email me" option so the
            // user can choose to receive a link later instead of waiting.
            if (progress === 20) {
              const emailExportLink = document.getElementById('emailExportLink');
              if (emailExportLink) {
                emailExportLink.style.display = 'block';
                const btn = document.getElementById('emailExportLinkBtn');
                if (btn) {
                  btn.setAttribute(
                    'onclick',
                    `taskExportEmailLink('${projectID}', '${hash}')`,
                  );
                }
              }
            }
          } else {
            // UI: Unknown or failed status – show error message from backend.
            window.alertModal({
              type: 'error',
              message: res.msg,
            });
          }
        })
        .catch((error) => {
          // UI: Network or parsing error – inform the user.
          const errorMessage =
            error && typeof error === 'object' && 'message' in error
              ? (error as Error).message
              : 'Unknown error';
          window.alertModal({
            type: 'error',
            message: errorMessage,
          });
        });
    }, 2500);
  }
}

// Example singleton usage
const downloadManager = DownloadManagerService.getInstance();
downloadManager.downloadRequestHash('123', '/api/file/generate/create', { emailme: true });
