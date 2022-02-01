define('file', [], function() {
  function downloadFileFromLocal(data) {
    const sampleFile = document.querySelector('.form__sample-file');
    const file = document.createElement('a');
    const url = URL.createObjectURL(data.response);
    file.style.display = 'none';
    file.href = url;
    file.download = sampleFile.value;
    file.click();
  }

  return downloadFileFromLocal;
});