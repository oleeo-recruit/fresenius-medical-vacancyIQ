import { a as addPrevNextBtnsClickHandlers, b as addDotBtnsAndClickHandlers } from "./carousel.js";
import "./animation.js";
import "./breadcrumb.js";
import { checkJobFamily, highlightTab } from "./job-details.js"

const isJobDetailPage = document.querySelector(".job-detail-page")
if (isJobDetailPage) {
  checkJobFamily()
  highlightTab()
}

if (window.location.pathname?.includes('/career-areas')) {
  const careerColumn = document.querySelector(".career-areas-column")
  if (careerColumn) {
    careerColumn.style.display = 'none'
  }
}

const oliviaClick = document.querySelectorAll(".oliviaButton");
if (oliviaClick) {
  oliviaClick.forEach((element) => {
    element.addEventListener("click", () => {
      const isOliviaOn = document.querySelector("#chat-widget");
      if (typeof isOliviaOn != "undefined" && isOliviaOn != null) {
        document.getElementsByClassName("apply-messenger-launcher")[0].click();
      }
    });
  });
}
if (document.querySelectorAll(".menu-dropdown").length > 0) {
  document.querySelectorAll(".menu-dropdown").forEach((menu) => {
    const toggle = $(menu).find(".menu-dropdown--toggle");
    const toggleArrow = $(menu).find(".menu-dropdown--toggle svg");
    const content = $(menu).find(".menu-dropdown--content");
    const openMenu = () => {
      $(toggle).attr("aria-expanded", "true");
      $(content).attr("aria-hidden", "false").stop(true, false).slideDown(300);
      $(toggleArrow).addClass("rotate-180");
    };
    const closeMenu = () => {
      $(toggle).attr("aria-expanded", "false");
      $(content).attr("aria-hidden", "true").stop(true, false).slideUp(300);
      $(toggleArrow).removeClass("rotate-180");
    };
    $(menu).on("mouseenter", function () {
      openMenu();
    });
    $(menu).on("focusin", function (event) {
      openMenu();
    });
    $(menu).on("mouseleave", function () {
      closeMenu();
    });
    $(menu).on("focusout", function (event) {
      if (!$(event.relatedTarget).is(toggle) && $(event.relatedTarget).closest(content).length === 0 && $(event.relatedTarget).closest(toggle).length === 0) {
        closeMenu();
      }
    });
  });
}
if (document.querySelectorAll("#nav a").length > 0) {
  document.querySelectorAll("#nav a").forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("current");
    }
  });
}
if (document.querySelectorAll("#nav-list").length > 0) {
  document.querySelectorAll("#nav-list").forEach((mobileNav) => {
    const navContainer = $('#nav-container');
    $("#nav-list--toggle").on("click", function () {
      const isNavPreviouslyClosed = !$(mobileNav).hasClass("active");
      $(mobileNav).toggleClass("active");
      $(mobileNav).attr({
        "aria-hidden": isNavPreviouslyClosed ? "false" : "true",
        tabindex: isNavPreviouslyClosed ? "0" : "-1"
      });
      $(this).parent().next().stop(true, false).slideToggle(300);
      $(this).find("use").toggleClass("hidden");
      $(this).attr({
        "aria-expanded": isNavPreviouslyClosed ? "true" : "false"
      });
      if (isNavPreviouslyClosed) {
        navContainer.css('background-color', '#071B45');
        $(this).find("use").css('color', '#FFF');
        $('html').css({
          overflow: 'hidden',
          height: '100vh',
        });
      } else {
        navContainer.css('background-color', '#FFF');
        $(this).find("use").css('color', '#0033A0');
        $('html').css({
          overflow: 'unset',
          height: 'unset',
        });
      }
      navContainer.find('#header-logo img').toggleClass('hidden');
    });
    $(document).on("click", function (e) {
      if (!$(e.target).closest("#nav-container").length && !$(e.target).closest("#job-details-nav-container").length) {
        $(mobileNav).stop(true, false).slideUp(300);
        $(mobileNav).removeClass("active");
        $(mobileNav).attr({ "aria-hidden": "true", tabindex: "-1" });
        $("#nav-list--toggle").find("use[href='#icon-x']").addClass("hidden");
        $("#nav-list--toggle").find("use[href='#icon-bars-3']").removeClass("hidden");
        $("#nav-list--toggle").attr({ "aria-expanded": "false" });
      }
    });
  });
}
const mobileNavSteps = ['nav-list-step-1', 'nav-list-step-2'];
mobileNavSteps.forEach((step) => {
  const trigger = $(`#${step}-trigger`);
  const stepElem = $(`#${step}`);
  if (trigger) {
    trigger.on('click', () => {
      mobileNavSteps.forEach((s) => {
        $(`#${s}`).css('display', 'none');
      });
      stepElem.css('display', 'block');
    });
  }
});

const navbar = document.querySelector("header");
if (navbar && window.innerWidth > 767 && !$(navbar).hasClass('always-show')) {
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navbar.style.top = "-100%";
    } else {
      navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });
}
const carouselElems = document.querySelectorAll(".carousel");
if (carouselElems.length > 0) {
  carouselElems.forEach((carouselElem) => {
    const carouselSlide = carouselElem.querySelector(".carousel--slide");
    const dotsNode = carouselElem.querySelector(".carousel--dots");
    const prevBtn = carouselElem.querySelector(".carousel--prev");
    const nextBtn = carouselElem.querySelector(".carousel--next");
    if (carouselSlide) {
      const embla = EmblaCarousel(
        carouselSlide,
        {
          loop: false,
          align: "start"
        },
        [EmblaCarouselClassNames()]
      );
      let removePrevNextBtnsClickHandlers = null;
      if (prevBtn && nextBtn) {
        removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
          embla,
          prevBtn,
          nextBtn
        );
      }
      const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
        embla,
        dotsNode
      );
      embla.on("destroy", () => {
        removeDotBtnsAndClickHandlers();
        if (prevBtn && nextBtn) {
          removePrevNextBtnsClickHandlers();
        }
      });
    }
  });
}
// const statisticItems = document.querySelectorAll(".statistic--item");
// if (statisticItems.length > 0) {
//   statisticItems.forEach((item) => {
//     gsap.to(item, {
//       scrollTrigger: item,
//       onStart: () => {
//         const statisticNumbers = $(item).find(".statistic--number");
//         $(statisticNumbers).each(function () {
//           const elem = $(this);
//           const startNumber = elem.text();
//           const endNumber = elem.attr("data-stat");
//           $({
//             countNum: startNumber
//           }).animate(
//             {
//               countNum: endNumber
//             },
//             {
//               duration: 3e3,
//               easing: "linear",
//               step: function () {
//                 elem.text(formatNumber(Math.floor(this.countNum)));
//               },
//               complete: function () {
//                 elem.text(formatNumber(this.countNum));
//               }
//             }
//           );
//         });
//       }
//     });
//   });
// }
// const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");




let currentLang = document.documentElement.lang || 'en';


const formatNumber = (number) => {
  return new Intl.NumberFormat(currentLang).format(number);
};


const updateStatisticNumbers = () => {
  const statisticNumbers = document.querySelectorAll(".statistic--number");
  statisticNumbers.forEach((elem) => {
    const raw = elem.getAttribute("data-stat");
    if (raw) {
      const number = parseFloat(raw);
      elem.textContent = formatNumber(number);
    }
  });
};


const animateStatistics = () => {
  const statisticItems = document.querySelectorAll(".statistic--item");

  if (statisticItems.length > 0) {
    statisticItems.forEach((item) => {
      gsap.to(item, {
        scrollTrigger: item,
        onStart: () => {
          const statisticNumbers = item.querySelectorAll(".statistic--number");
          statisticNumbers.forEach((elem) => {
            const startNumber = parseFloat(elem.textContent.replace(/[^\d.-]/g, "")) || 0;
            const endNumber = parseFloat(elem.getAttribute("data-stat"));

            $({ countNum: startNumber }).animate(
              { countNum: endNumber },
              {
                duration: 3000,
                easing: "linear",
                step: function () {
                  elem.textContent = formatNumber(Math.floor(this.countNum));
                },
                complete: function () {
                  elem.textContent = formatNumber(this.countNum);
                }
              }
            );
          });
        }
      });
    });
  }
};

const htmlObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
      const newLang = document.documentElement.lang;
      if (newLang !== currentLang) {
        currentLang = newLang;
        updateStatisticNumbers();
      }
    }
  });
});

htmlObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['lang'],
});


animateStatistics();



const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.innerHTML = (/* @__PURE__ */ new Date()).getFullYear();
}
$(".popup-button--link").magnificPopup({
  type: "iframe"
});
$(".popup-button--link").on("click", function () {
  $(".mfp-close").attr("aria-label", "Close modal");
});
const accordionElems = document.querySelectorAll(".accordion");
if (accordionElems.length > 0) {
  accordionElems.forEach((accordionElem) => {
    const accordion = $(accordionElem);
    const accordionToggles = accordion.find(".accordion--toggle");
    if (accordionToggles.length > 0) {
      accordionToggles.each((index) => {
        const toggle = $(accordionToggles[index]);
        const content = toggle.next();
        const toggleIcon = toggle.find(".accordion--toggle__icon svg use");
        toggle.on("click", () => {
          if (!toggle.hasClass("active")) {
            accordion.find(".accordion--toggle").removeClass("active");
            toggle.addClass("active").attr("aria-expanded", "true");
            content.slideToggle(200).attr(
              "aria-hidden",
              content.attr("aria-hidden") === "true" ? "false" : "true"
            );
            toggleIcon.attr(
              "href",
              toggleIcon.attr("href") === "#icon-plus" ? "#icon-minus" : "#icon-plus"
            );
          } else {
            toggle.removeClass("active").attr("aria-expanded", "false");
            content.slideUp(200).attr("aria-hidden", "true");
            toggleIcon.attr("href", "#icon-plus");
          }

          toggle.toggleClass('text-smalt')
        });
      });
    }
  });
}

if (document.querySelector("#backButton")) {
  document.getElementById('backButton').addEventListener('click', function () {
    const referrer = document.referrer.toLowerCase();
    const currentHostname = window.location.hostname.toLowerCase();

    if (referrer.includes(currentHostname)) {
      window.history.back();
    } else {
      window.location.href = "/jobs";
    }
  });
}

function navigateToJobsList() {
  const jobsListElem = document.querySelectorAll(".c-job-main__right");
  if (jobsListElem.length > 0) {
    setTimeout(() => jobsListElem[0].scrollIntoView(), 100);
  }
}

const keywordInputElem = document.querySelectorAll(".keyword-search__input input");
if (keywordInputElem.length > 0) {
  keywordInputElem.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        navigateToJobsList()
      }
    })
  })
}

const jobSearchButtons = document.querySelectorAll(".c-main-hero-search__button-search")
if (jobSearchButtons.length > 0) {
  jobSearchButtons.forEach((button) => {
    const t = document.querySelector(".c-job-main__right");
    button.addEventListener("click", () => {
      t == null || t.scrollIntoView({
        behavior: "smooth"
      })
    }
    )
  })
}

const observer = new MutationObserver(() => {
    const applyWidget = document.querySelector('apply-widget')

    if (applyWidget && applyWidget?.shadowRoot) {
        // Inject responsive styles
        const style = document.createElement('style')
        style.textContent = `
@media (max-width: 565px) {
  #apply-widget:has(> div[role="complementary"]) .el-dialog__wrapper.terms-modal .el-dialog {
      padding-bottom: 6rem;
  }
}

#apply-widget:has(> div[role="complementary"]) .widget-chatbox {
    padding-bottom: 4rem;
}

@media (max-width: 565px) {
  #apply-widget:has(> div[role="complementary"]) .widget-chatbox {
    padding-bottom: 6rem;
  }
}
    `

        applyWidget.shadowRoot.appendChild(style)

        const launchers = applyWidget.shadowRoot.querySelectorAll(".apply-messenger-launcher")
        if (launchers.length) {
            observer.disconnect()
        }
    }
})

// Start observing the DOM for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
})
