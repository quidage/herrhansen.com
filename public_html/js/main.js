(function($) {
    $.fn.writeText = function(content, callback) {
        var contentArray = content.split(""),
            current = 0,
            elem = this;
        interval(function() {
            if(current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            } else {
                clearTimeout();
                if (typeof callback === 'function') { // make sure the callback is a function
                    callback.call(this); // brings the scope to the callback
                } 
            }
        }, 180, 21);
    };
})(jQuery);

function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);
    setTimeout(interv, wait);
};

$(document).ready(function(){
    $('.window').draggable();
    $('#first-input').writeText('whois herrhansen.com', function(){
        setTimeout(function(){
            $('.terminal-answer').show();
        }, 1000);
    });
});
