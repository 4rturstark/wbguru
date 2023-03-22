$(document).ready(function() {
  // $(".review__slider").slick({
  //   adaptiveHeight: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   appendArrows: $(".slider__nav"),
  //   variableWidth: true,
  //   responsive: [
  //     {
  //       breakpoint: 920,
  //       settings: {
  //         variableWidth: false
  //       }
  //     },
  //     {
  //       breakpoint: 540,
  //       settings: {
  //         variableWidth: false,
  //         arrows: false,
  //         dots: true,
  //         appendDots: $(".slider__nav")
  //       }
  //     }
  //   ]
  // });

  document.querySelector(".start__form__inp").onkeyup = function() { 
    var reg = /[а-яА-ЯёЁ]/g;
    if (this.value.search(reg) != -1) {
      this.value = this.value.replace(reg, "");
    }
  };

  $(".start__input").attr("required", "true");
  $(".start__form__inp").attr("required", "true");
  $(".start__form__btn").attr("disabled", "disabled");

  $(".programm__btn").click(function() {
    $(".programm__list").toggleClass("show-list");
    if ($(".programm__list").hasClass("show-list")) {
      $(".programm__btn").html("Скрыть программу");
    } else {
      $(".programm__btn").html("Раскрыть программу");
    }
  });

  var startBtn = document.querySelector(".start__form__btn");
  let adress = document.location.href;

  function checkedFirst() {
    if (
      $(".start__form__inp")
        .val()
        .match(/.+?\@.+/g) &&
      $("#offer").prop("checked") === true &&
      $(".start__form__inp")
        .val()
        .match(/.+?\..+/g)
    ) {
      startBtn.removeAttribute("disabled");
      startBtn.classList.remove("disabled");
      $(startBtn).css("cursor", "pointer");
    } else {
      startBtn.setAttribute("disabled", "disabled");
      startBtn.classList.add("disabled");
      $(startBtn).css("cursor", "default");
    }
  }

  function checkedSecond() {
    if (
      $(".start__form__inp")
        .val()
        .match(/.+?\@.+/g) &&
      $("#offer").prop("checked") === true &&
      $("#payment").prop("checked") === true &&
      $(".start__form__inp")
        .val()
        .match(/.+?\..+/g)
    ) {
      startBtn.removeAttribute("disabled");
      startBtn.classList.remove("disabled");
      $(startBtn).css("cursor", "pointer");
    } else {
      startBtn.setAttribute("disabled", "disabled");
      startBtn.classList.add("disabled");
      $(startBtn).css("cursor", "default");
    }
  }
  if (
    adress.includes("utm_medium") == true ||
    adress.includes("utm_compaign") == true
  ) {
    $(".payment").css("display", "none");
    $("#offer").attr("checked", "true");
    $(".start__form").on("change", function() {
      checkedFirst();
    });
    $(".start__form__inp").on("input", function() {
      checkedFirst();
    });
  } else {
    $(".start__form").on("change", function() {
      checkedSecond();
    });
    $(".start__form__inp").on("input", function() {
      checkedSecond();
    });
  }

  $("#input-submit").click(function(e) {
    e.preventDefault();
    $(".popup").css("zIndex", "99999999");
    $(".popup").css("background", "rgb(255, 255, 255)");
    $(".popup").addClass("show-popup");
    $(".popup__img").addClass("rotate");
    $(".popup__desc").css("color", "#011936");
    // function hidePopup() {
    //   $(".popup").css("display", "none");
    // }
    // setTimeout(hidePopup, 5000);
    impaya();
  });

  function impaya() {
    const impaya_url = 'https://api-stage.impaya.ru/session';
    const key = 'wb3.guru_3ds_qiwicontact';
    const terminal_password = "4uePoHGELqp8Gzck#IMv";
    const merchant_name = "IPKuchmistiy";
    const merchant_password = "4uePoHGELqp8Gzck#IMv";
    const terminal_password = "4uePoHGELqp8Gzck#IMv";
    const params = {
      successUrl: "https://wb3.guru/kurs/",
      failUrl: "https://wb3.guru/error",
      Email: $(".start__form__inp").val()
    }
    const register = {
      key,
      terminal_password,
      "merchant_order_id": new Date().getTime(),
      "amount": 33 * 100,
      "type": "pay",
      "payment_type": "OneStep",
      "lifetime": 10000,
      "credential": {
        "login": "",
        "password": "",
        merchant_name,
        merchant_password,
        terminal_password
      },
      "custom_params_raw": Object.keys(params).map(param => `${param}=${params[param]}`).join(';'),
      "card_uid": "",
      "action": "",
      "recurrent": true
    }
    $.ajax({
        url: impaya_url,
        type: 'POST',
        data: JSON.stringify(register),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data){
          if (data.Success) {
            window.location = impaya_url + 'session-id=' + data.SessionGUID
          }
        },
        error: function() {
          window.location = params.failUrl
        }
    })
  }
});
