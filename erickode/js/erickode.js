jQuery(document).ready(function ($) {
    $("body").niceScroll({cursorcolor: "#8d8c8c"});

    /* Guardar en variables los 3 elementos mas utilizados
     * div.overlay = "overlay"
     * span.toggleButtomMenu = "toggleButtomMenu"
     * div.menu = "menu"
     */
    var overlay = $(".overlay");
    var toggleButtomMenu = $("#toggleButtomMenu");
    var menu = $(".menu");

    /* Evaluar si el "menu" tiene la clase que lo posiciona
     * a la izquierda o derecha cone el finde colocar en el
     * mismo lado el "toggleButtomMenu". Si por accidente la
     * clase "menuLeft" o "menuRight" esta mal escrita o
     * simplemente no esta, voy a lanzar un alert de error.
     */
    if (menu.hasClass("menuLeft")) {
        toggleButtomMenu.css("left", "0");
    } else if (menu.hasClass("menuRight")) {
        toggleButtomMenu.css("right", "0");
    } else {
        alert("Error de código:\n\n¡Agrega la clase 'menuLeft' o 'menuRight' al div.menu!\n\n");
    }

    /* En el evento click del "toggleButtomMenu" vamos a
     * evaluar ¿Que clase tiene? (fa-close) : para cerrar
     * (fa-reorder) : para mostrar el menu y dependiendo
     * que clase tenga vamos a mostrar/ocultar el menu
     */
    toggleButtomMenu.on("click", function () {
        if (toggleButtomMenu.hasClass("fa-close")) {
            menuFunctionality.Hide();
        } else {
            menuFunctionality.Show();
        }
    });

    /* Cuando den click en el "overlay" se va a ocultar el menu */
    overlay.on("click", function () {
        menuFunctionality.Hide();
    });

    /* Agrupamiento de eventos del menu
     * 1 - Hide: para ocultarlo
     *      1.1- Evaluar si esta a la izquierda, para el caso que este a la izquierda
     *          posicionar el menu de una manera oculta a -150px a la izquierda de la pantalla
     *          posicionar el boton a left: 0; top: 0;
     *      1.2- Si en caso esta el menu a la derecha vamos a realizar el mismo procesimiento pero referido a la derecha
     *      1.3- si no esta a la izquierda o derecha, lanzamos un error
     *      1.4- Luego hacemos cambios a los iconos:
     *          ocultamos el fa-close y mostramos el fa-reorder
     *      1.5- Finalmente ocultar el Overlay
     * 2 - Show: para mostrarlo
     *          Evaluamos si tiene la clase menuLeft o menuRight y de acuerdo a eso
     *          vamos a hacer un left: 150px o right: 150px,
     *          si no: lanzamos un error
     *          luego hacemos cambios de los iconos
     *          finalmente mostrar el overlay
     * 3 - PageOverlayShow: Para mostrar el "overlay"
     * 4 - PageOverlayHide: Para ocultar el overlay"
     */
    var timeAnimation = 200;//velocidad de la animacion Show/Hide, expresado en milisegundos
    var menuFunctionality = {
        Hide: function () {
            try {
                if (menu.hasClass("menuLeft")) {
                    menu.animate({
                        left : -150
                    },timeAnimation);
                    toggleButtomMenu.animate({
                        left : 0
                    },timeAnimation);
                } else if (menu.hasClass("menuRight")) {
                    menu.animate({
                        right : -150
                    },timeAnimation);
                    toggleButtomMenu.animate({
                        right : 0
                    },timeAnimation);
                } else {
                    throw new Error("Hay un error en el código, seguramente no se ha establecido la posicion del menu: menuLeft ó menuRight}");
                }
                toggleButtomMenu.removeClass("fa-close");
                toggleButtomMenu.addClass("fa-reorder");
            } catch (e) {
                console.log(e);
            } finally {
                menuFunctionality.PageOverlayHide();
            }
        },
        Show: function () {
            try {
                if (menu.hasClass("menuLeft")) {
                    menu.animate({
                        left : 0
                    },timeAnimation);
                    toggleButtomMenu.animate({
                        left : 150
                    },timeAnimation);
                } else if (menu.hasClass("menuRight")) {
                    menu.animate({
                        right : 0
                    },timeAnimation);
                    toggleButtomMenu.animate({
                        right : 150
                    },timeAnimation);
                } else {
                    throw new Error("Hay un error en el código, seguramente no se ha establecido la posicion del menu: menuLeft ó menuRight}");
                }
                toggleButtomMenu.addClass("fa-close");
                toggleButtomMenu.removeClass("fa-reorder");
            } catch (e) {
                console.log(e);
            } finally {
                menuFunctionality.PageOverlayShow();
            }
        },
        PageOverlayShow: function () {
            overlay.fadeIn(timeAnimation);
        },
        PageOverlayHide: function () {
            overlay.fadeOut(timeAnimation);
        }
    };
});