

// import { useCallback, useState } from "react"
// import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
// import Input from "@/app/components/input/input";
// import Button from "@/app/components/Button";
// import AuthSocialButton from "./AuthSocialButton";
// import { BsGithub, BsGoogle } from "react-icons/bs";
import Form from "./Form"


// type Variant = 'LOGIN' | 'REGISTER'

export default function AuthForm() {
// const [variant, setVariant] = useState<Variant>('LOGIN');
// const [isLoading, setIsLoading] = useState(false)

// const toggleVariant = useCallback(() => {
//     variant === 'LOGIN' ?
//         setVariant('REGISTER') :
//         setVariant('LOGIN')
// }, [variant])

// const {
//     register,
//     handleSubmit,
//     formState: {
//         errors
//     }
// } = useForm<FieldValues>({
//     defaultValues: {
//         name: '',
//         email: '',
//         password: ''
//     }
// })

// const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true)

//     if (variant === 'REGISTER') {
//         // AXIOS REGISTER
//     }

//     if (variant === 'LOGIN') {
//         // NextAuth SignIn
//     }
// }

// const socialAction = (action: string) => {
//     setIsLoading(true);

//     // NextAuth Social SignIn
// }

  return (
    <div
        className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        "
    >
        <div
          className="
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
          "  
        >
            <Form/>
        </div>
    </div>
  )
}
