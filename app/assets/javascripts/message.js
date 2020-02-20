$(function(){

  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id= ${message.id} >
        <div class="chat-main__message__box">
          <div class="chat-main__message__box__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__message__box__data">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src="${message.image}" class="lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id= ${message.id} >
        <div class="chat-main__message__box">
          <div class="chat-main__message__box__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__message__box__data">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id= ${message.id} >
        <div class="chat-main__message__box">
          <div class="chat-main__message__box__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__message__box__data">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message__text">
          <img src="${message.image}" class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };

$('#new_message').on('submit', function(e){
  
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
   .done(function(data){
     var html = buildHTML(data);
     $('.chat-main__message').append(html);
     $('.chat-main__message').animate({scrollTop: $('.chat-main__message')[0].scrollHeight}, 'fast');   
     $('form')[0].reset();
     $('.chat-main__form__submit').prop('disabled', false)
   })
    .fail(function(){
      alert('error');
    });
  });

  var reloadMessages = function() {
    if (document.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      })
      .fail(function() {
        alert('メッセージ送信に失敗しました');
      });
    };
  }
    setInterval(reloadMessages, 7000);
});