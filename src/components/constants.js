define('constants', [], function() {
  const DISPLAY_STYLE = { styleFlex: 'flex', styleNone: 'none' };
  const DEFAULT_ELEM = { defaultInput: 'form__sample-file', defaultBar: 'progress-download__value' };
  const EMPTY_STRING = '';
  const PERCENT = '0%';
  const IMAGE = 'image';
  const RESPONSE_TYPE = {
    typeBlob: 'blob',
    typeJson: 'json'
  };

  const MESSAGES = {
    successUpload: 'You have successfully upload the file or image',
    requireChoice: 'Invalid file name',
    successReceive: 'You have successfully receive a photo',
    successDownload: 'You have successfully download the file',
    successDelete: 'You have successfully delete the file or image'
  };

  const NOTIFY_STATUS = {
    success: 'Success',
    error: 'Error'
  };

  return { DISPLAY_STYLE, DEFAULT_ELEM, EMPTY_STRING, PERCENT, RESPONSE_TYPE, NOTIFY_STATUS, IMAGE, MESSAGES };
});