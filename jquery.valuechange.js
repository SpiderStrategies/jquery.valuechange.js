$.event.special.valuechange = {

  teardown: function (namespaces) {
    $(this).unbind('.valuechange')
  },

  handler: function (e) {
    $.event.special.valuechange.triggerChanged($(this))
  },

  add: function (obj) {
    $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
  },

  triggerChanged: function (element) {
    var current = element[0].contentEditable === 'true' ? element.html() : element.val()
      , previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous')
    if (current !== previous) {
      element.trigger('valuechange', [element.data('previous')])
      element.data('previous', current)
    }
  }
}
