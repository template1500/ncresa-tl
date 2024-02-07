import axios from 'axios'
import endPoints from '.'

const sendMail = async (body: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await axios.post(endPoints.mail.send, body, config)
  return response.data
}

export default sendMail
