import Input from "./Input"
import Button from "./Button"
import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'

interface ContactFormProps {
    id?: string[]
}

function ContactForm(props: ContactFormProps) {
    const { register, handleSubmit } = useForm({})

    const onSubmit = (data: any, event: any) => {
        // Update car
        if(props.id && props.id.length>0) {
            server_calls.update(props.id[0], data)
            setTimeout(() => window.location.reload(), 1000)
            event.target.reset()
        }
        // Add new car
        else {
            server_calls.create(data)
            setTimeout(()=> window.location.reload(), 1000)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Make</label>
                    <Input {...register('make')} name='make' placeholder='Make'/>
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name='model' placeholder='Model'/>
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name='year' placeholder='Year'/>
                </div>
                <div className="flex p-1">
                    <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
  )
}

export default ContactForm
