export default function setFontsize(){

    let designWidth = 750,
        designFontSize = 100,
        win_width=0;
    if(window.screen.width>750){
        win_width=750
    }else{
        win_width= window.screen.width
    }
    let scale = win_width/designWidth;

    let root_font_size = ((scale * 10000 * designFontSize) / 10000).toFixed(4);

    document.documentElement.style.fontSize = root_font_size+'px';
    window.onresize=function () {
      setFontsize();
    }
};




