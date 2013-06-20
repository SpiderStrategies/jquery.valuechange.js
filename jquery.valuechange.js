$.event.special.valuechange = {
  setup: function (data, namespaces) {
    $(this).data('previous', this.contentEditable === 'true' ? $(this).html() : $(this).val())
    $(this).bind('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', $.event.special.valuechange.handler)
  },

  teardown: function (namespaces) {
    $(this).unbind('.valuechange')
  },

  handler: function (e) {
    $.event.special.valuechange.triggerChanged($(this))
  },

  triggerChanged: function (element) {
    var current = element[0].contentEditable === 'true' ? element.html() : element.val()
    if (current !== element.data('previous')) {
      element.trigger('valuechange', [element.data('previous')])
      element.data('previous', current)
    }
  }
}
