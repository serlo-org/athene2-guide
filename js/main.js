;(function ($, window, undefined) {
    $(function () {
        $('#side-nav').affix({
            offset: {
                top: 0
            }
        });

        $('body').scrollspy({
            target: '#side-nav'
        });
    });
}(jQuery, window));