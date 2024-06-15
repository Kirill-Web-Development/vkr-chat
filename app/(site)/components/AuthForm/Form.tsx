'use client'

import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/input/input";
import Button from "@/app/components/Button";
import AuthSocialButton from "../AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER'


const Form = () => {
    const session = useSession()
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        console.log(session)
        if (session.status === 'authenticated') {
            router.push('/users')
        }
    }, [session.status, router])

    const toggleVariant = useCallback(() => {
        variant === 'LOGIN' ?
            setVariant('REGISTER') :
            setVariant('LOGIN')
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log('111')
        if (isLoading) return;

        setIsLoading(true)

        if (variant === 'REGISTER') {
            // AXIOS REGISTER
            axios.post('/api/register', data)
                .then(() => {
                    toast.success('Account created!')
                    signIn('credentials', data)
                })
                .catch((e) => {
                    console.log(e)
                    toast.error(e.response.data)
                })
                .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then(res => {
                if (res?.error) {
                    toast.error('Invalid credentials')
                }

                if (res?.ok && !res?.error) {
                    toast.success('Logged in!')
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth Social SignIn
        signIn(action, { redirect: false })
        .then(res => {
            if (res?.error) {
                toast.error('Invalid credentials')
            }

            if (res?.ok && !res?.error) {
                toast.success('Logged in!')
            }
        })
        .catch(error => {
            if (error.name === "OAuthAccountNotLinkedError") {
                // Display a custom text message or toast notification to inform the user
                console.log(`Please link your account with ${action} to enable login with third-party apps.`);
                // You can use a toast notification library, such as react-toastify, to display a notification
                toast.error(`Please link your account with ${action} to enable login with third-party apps.`);
              } else {
                console.log("Login failed");
                // Handle other errors as needed
            }
        })
        .finally(() => setIsLoading(false))
    }


    return (
        <>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'REGISTER' && (
                <Input 
                    label="Name"
                    register={register}
                    id="name"
                    errors={errors}
                    placeholder='Type name'
                />
                )}
                <Input 
                    label="Email address"
                    register={register}
                    id="email"
                    errors={errors}
                    type='email'
                    placeholder='Type email'
                />
                <Input 
                    label="Password"
                    register={register}
                    id="password"
                    errors={errors}
                    type='password'
                    placeholder='Type password'
                />
                <Button
                    disabled={isLoading}
                    fullWidth
                    type="submit" 
                >
                        {variant === 'LOGIN' ? 'Sign in' : 'Register' }
                </Button>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                        "
                    >
                        <div
                            className="
                                w-full
                                border-t
                                border-gray-300
                            "
                        />
                    </div>
                    <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                    </div>
                </div> 

                <div className="mt-6 flex gap-2">
                    <AuthSocialButton 
                        icon={BsGithub} 
                        onClick={() => socialAction('github')}
                    />
                    <AuthSocialButton 
                        icon={BsGoogle} 
                        onClick={() => socialAction('google')}
                    />
                </div>       
            </div>

            <div className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
            ">
                <div>
                    {variant === 'LOGIN' ?
                    'New to Messenger?' :
                    'Already have an account?'
                    }
                </div>
                <div
                    onClick={() => {
                        toggleVariant();
                        reset();
                    }}
                    className="underline cursor-pointer"
                >
                    {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                </div>
            </div>
        </>
    );
};

export default Form;