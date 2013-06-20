$.event.special.valuechange = {

  teardown: function (namespaces) {
    $(this).unbind('.valuechange')
  },

  handler: function (e) {
    $.event.special.valuechange.triggerChanged($(this))
  },

  add: function (obj) {
    var selector = obj.selector
      , el = selector ? $(selector, this) : $(this)
    el.data('previous', this.contentEditable === 'true' ? $(el).html() : $(el).val())
    el.bind('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', $.event.special.valuechange.handler)
  },

  triggerChanged: function (element) {
    var current = element[0].contentEditable === 'true' ? element.html() : element.val()
    if (current !== element.data('previous')) {
      element.trigger('valuechange', [element.data('previous')])
      element.data('previous', current)
    }
  }
}
