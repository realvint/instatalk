import consumer from './consumer'

document.addEventListener('turbolinks:load', () => {
  let messages

  messages = document.getElementById('messages')

  if (messages) {
    createRoomChannel(messages.dataset.roomId)
  }

  const message = document.getElementById('message_body')

  if (message) {
    messages.scrollTop = messages.scrollHeight

    message.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && message.value.length > 0) {
        room.speak(message.value)
        message.value = ''
        event.preventDefault()
      }
    })
  }
})

let room

const createRoomChannel = (roomId) => {
  room = consumer.subscriptions.create({
    channel: 'RoomChannel',
    roomId: roomId
  }, {

    received(data) {
      messages.insertAdjacentHTML('beforeend', (data['message']))
      messages.scrollTop = messages.scrollHeight
    },

    speak(message) {
      return this.perform('speak', {
        message: message
      })
    }
  })
}
