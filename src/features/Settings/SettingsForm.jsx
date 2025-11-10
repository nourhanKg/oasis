import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

import { useSettings } from "../../hooks/useSettings";
import { updateSettings } from "../../services/apiSettings";

import Spinner from "../../components/Spinner";
import FormControl from "../../components/FormControl";
import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";

function SettingsForm() {
    const queryClient = useQueryClient();

    const {isPending, settings, settingsError} = useSettings()
    const {mutate, isPending: isUpdating} = useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries({queryKey: ["settings"]});
        },
        onError: (err) => console.log(err),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    }
    = useForm({
        defaultValues: settings
    })
    console.log(errors)
    const onSubmit = (data) => {
        mutate(data);
    }
    useEffect(() => {
        if (settings) {
        reset(settings);
        }
    }, [settings, reset]);
    if(isPending) return (<Spinner />)
    if(!settingsError) return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl label='Minimum nights/booking' error={errors?.["min_booking_length"]?.message}>
                <Input type='number' id='min_booking_length' {...register("min_booking_length", 
                    {required: "This field is required", 
                    min: {
                        value: 1,
                        message: "Minimum nights/booking must be at least 1"
                    },
                    max: {
                        value: 99,
                        message: "Minimum nights/booking must be at most 99"
                    }
                    })}/>
            </FormControl>
            <FormControl label='Maximum nights/booking' error={errors?.["max_booking_length"]?.message}>
                <Input type='number' id='max_booking_length' {...register("max_booking_length", 
                    {required: "This field is required", 
                    min: {
                        value: 1,
                        message: "Maximum nights/booking must be at least 1"
                    },
                    max: {
                        value: 99,
                        message: "Maximum nights/booking must be at most 99"
                    }
                    })}/>
            </FormControl>
            <FormControl label='Maximum guests/booking' error={errors?.["max_guest_per_booking"]?.message}>
                <Input type='number' id='max_guest_per_booking' {...register("max_guest_per_booking"
                    , {required: "This field is required", 
                    min: {
                        value: 1,
                        message: "Maximum guests/booking must be at least 1"
                    },
                    max: {
                        value: 20,
                        message: "Maximum guests/booking must be at most 20"
                    }
                    }
                )}/>
            </FormControl>
            <FormControl label='Breakfast price' error={errors?.["breakfast_price"]?.message}>
                <Input type='float' id='breakfast_price' {...register("breakfast_price", {required: "This field is required"})}/>
            </FormControl>
            <FormControl>
                <Button disabled={isUpdating}>Update Settings</Button>
            </FormControl>
        </Form>
    )
}

export default SettingsForm;
