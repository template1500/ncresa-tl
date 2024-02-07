interface Props {
  className?: string
}

import sendMail from './api/sendMail'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Form(className: Props) {
  const formRef = useRef(null)

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(formRef.current!)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      description: formData.get('message')
    }

    sendMail(data)
      .then((response) => {
        console.log(response)
        toast.success('¡Correcto, mensaje enviado!', {
          position: 'bottom-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })

        setTimeout(() => {
          window.location.href = '/thanks-you'
        }, 1500)
      })

      .catch((err) => {
        const textErr = err.response.data.message
        const errName = '"name"'
        const errEmail = '"email"'
        const errPhone = '"phone"'
        const errDescription = '"description"'

        if (
          textErr.includes(errName) ||
          textErr.includes(errEmail) ||
          textErr.includes(errPhone) ||
          textErr.includes(errDescription)
        ) {
          const errorMessage = `Por favor, complete el ${
            textErr.includes(errName)
              ? 'nombre'
              : textErr.includes(errEmail)
              ? 'email'
              : textErr.includes(errPhone)
              ? 'teléfono'
              : 'el monto'
          } correctamente`
          toast.error(errorMessage, {
            position: 'bottom-right',
            autoClose: 2800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
        }
      })
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      className={`md:w-full w-[90%] bg-zinc-100/90 py-6 px-8 rounded-lg ${className}`}
    >
      <h3 className='text-xl font-bold mb-4'>¡Contáctenos Ahora!</h3>
      <p className='mb-5 font-openSans font-medium text-gray-500'>
        Asesoría 100% personalizada
      </p>
      <div className='mb-4'>
        <label
          htmlFor='name'
          className='block mb-2 font-semibold font-openSans text-sm text-gray-900'
        >
          Tu Nombre
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='shadow-sm bg-gray-50 border border-gray-300 font-openSans text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='block mb-2 font-semibold font-openSans text-sm text-gray-900'
        >
          Correo
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='shadow-sm bg-gray-50 border border-gray-300 font-openSans text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='phone'
          className='block mb-2 font-semibold font-openSans text-sm text-gray-900'
        >
          Número de Celular
        </label>
        <input
          type='text'
          id='phone'
          name='phone'
          className='shadow-sm bg-gray-50 border border-gray-300 font-openSans text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='message'
          className='block mb-2 font-semibold font-openSans text-sm text-gray-900'
        >
          Monto de Crédito
        </label>
        <textarea
          name='message'
          rows={2}
          id='message'
          className='shadow-sm bg-gray-50 border border-gray-300 font-openSans text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          required
        ></textarea>
      </div>

      <div className='flex items-start mb-5'>
        <div className='flex items-center h-5'>
          <input
            id='terms'
            type='checkbox'
            value=''
            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
            required
          />
        </div>
        <label
          htmlFor='terms'
          className='ms-2 font-bold font-openSans text-sm text-gray-900'
        >
          Estoy de acuerdo con el{' '}
          <a
            href='/aviso-privacidad'
            target='_blank'
            className='text-blue-600 hover:underline dark:text-blue-500'
          >
            Aviso de Privacidad
          </a>
        </label>
      </div>
      <button
        type='submit'
        className='text-black transition ease-in-out duration-300 bg-primary border-2 hover:border-primary hover:bg-transparent hover:scale-105 font-bold rounded-lg uppercase px-6 py-4 text-center'
      >
        Solicitar
      </button>
      <ToastContainer />
    </form>
  )
}
