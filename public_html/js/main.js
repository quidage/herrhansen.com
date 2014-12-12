(function($) {
    $.fn.writeText = function(content, callback) {
        var contentArray = content.split(""),
            current = 0,
            elem = this;
        interval(function() {
            if(current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            } else {
                if (typeof callback === 'function') { // make sure the callback is a function
                    callback.call(this); // brings the scope to the callback
                } 
            }
        }, 250, 10);
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
   $('#first-input').writeText('whoami', function(){
       $('.terminal-answer').show();
   });
});
