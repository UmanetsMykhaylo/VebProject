define(['uploadForm', 'downloadForm', 'image', 'file', 'list', 'notify', 'constants', 'progressBar'], function(UploadForm, DownloadForm, Image, downloadFileFromLocal, List, Notification, { IMAGE, NOTIFY_STATUS, MESSAGES }, ProgressBar) {
  const uploadFormWrapper = document.querySelector('.upload-wrapper');
  const downloadFormWrapper = document.querySelector('.download-wrapper');
  const imageWrapper = document.querySelector('.image-wrapper');
  const listWrapper = document.querySelector('.list-wrapper');
  const notifyWrapper = document.querySelector('.notify-wrapper');

  const downloadForm = new DownloadForm(downloadFormWrapper);
  const uploadForm = new UploadForm(uploadFormWrapper);
  const image = new Image(imageWrapper);
  const list = new List(listWrapper);
  const notification = new Notification(notifyWrapper);
  const progressBar = new ProgressBar(document.querySelector('.progress-download'));


  downloadForm.renderCallbackList('onDownloadProgress', progressBar.showProgress);
  downloadForm.renderCallbackList('onSubmitDownload', data => {
    if (data.response.type.substring(0, data.response.type.indexOf('/')) === IMAGE) {
      image.getImage(data);
      notification.successNotify({ message: MESSAGES.successReceive, delay: 3000 });
      return;
    }

    downloadFileFromLocal(data);
    notification.successNotify({ message: MESSAGES.successDownload, delay: 3000 });
  });

  downloadForm.renderCallbackList('onErrorResponse', data => {
    notification.errorNotify({ color: '#F08080', status: NOTIFY_STATUS.error, delay: 3000, ...data });
  });

  uploadForm.renderCallbackList('onSubmitUpload', list.updateList);
  uploadForm.renderCallbackList('onSuccessResponse', data => {
    notification.successNotify({ delay: 3000, ...data });
  });

  list.renderCallbackList('onSuccessDelete', data => {
    notification.successNotify({ delay: 3000, ...data });
  });
  list.renderCallbackList('click', downloadForm.setValue);
});
