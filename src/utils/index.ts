const getCursorPosition = (textarea: HTMLInputElement) => {
  const rangeData = {
    text: '',
    start: 0,
    end: 0
  };
  textarea.focus();
  if (textarea.setSelectionRange) {
    rangeData.start = textarea.selectionStart || 0;
    rangeData.end = textarea.selectionEnd || 0;
    rangeData.text = (rangeData.start !== rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : '';
  }
  return rangeData;
};

export {
  getCursorPosition
};
