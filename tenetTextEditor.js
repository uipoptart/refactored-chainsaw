
  $('#B').on('click', function () {
    $('#prompt-for-url-modal').modal('show');
  })

  $('#makeLink').on('click', function () {
    editor.insertHTML('hello');
  })

  var div = document.getElementById('editor-container');
  div.style.lineHeight = 1.0;
  editor = new Squire(div, {
    blockTag: 'p',
    blockAttributes: {
      'class': 'paragraph'
    },
    tagAttributes: {
      ul: {
        'class': 'UL'
      },
      ol: {
        'class': 'OL'
      },
      li: {
        'class': 'listItem'
      }
    }
  });
