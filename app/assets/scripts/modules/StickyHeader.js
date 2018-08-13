import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor(){
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");
        this.createHeaderWaypoint();
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
    }
    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }
    createHeaderWaypoint() {
        var thisElement = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function (direction) {
                if (direction == "down") {
                    thisElement.siteHeader.addClass("site-header--dark");
                } else {
                    thisElement.siteHeader.removeClass("site-header--dark");
                }
            }
        })
    }
    createPageSectionWaypoints() {
        var thisElement = this;
        this.pageSections.each(function () {
            var currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "down") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        thisElement.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }

                },
                offset: "20%"
            });
            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "up") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        thisElement.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }

                },
                offset: "-40%"
            });
        });
    }
}

export default StickyHeader;
