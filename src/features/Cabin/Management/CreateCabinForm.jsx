import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router";

import { getCabinById } from "../../../services/apiCabins";
import { useCreateEditCabin } from "../../../hooks/useCreateEditCabin"; 

import Spinner from "../../../components/Spinner";
import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Form from "../../../components/Form";
import Button from "../../../components/Button";
import FileInput from "../../../components/FileInput";
import Textarea from "../../../components/Textarea";
import { useEffect } from "react";

function CreateCabinForm({isEditMode = false, type ="regular"}) {
  //Get cabin data from router state and if doesn't exist, get cabin data from api
  const { state } = useLocation();
  const {cabinId} = useParams();
  const queryObj = useQuery({
    queryKey: ['cabin-details', cabinId],
    queryFn: () => getCabinById(cabinId),
    retry: 0,
    staleTime: 0,
    enabled: (isEditMode && !state?.cabin),  
  })
  const {isFetching: isPendingDetails, data} = queryObj;
  const cabin = state?.cabin || data || {};
  const {id, ...cabinData} = cabin;

  const { 
    register, 
    handleSubmit, 
    getValues,
    watch, 
    reset,
    formState: { errors } } = useForm();
  
  const {isUpdating, updateCabin} = useCreateEditCabin(isEditMode);
  
  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    updateCabin({formData: {...data, image: image}, id: cabinId || undefined}, {
      onSuccess: () => {
        reset();
      }
    });
  };
  useEffect(() => {
    if (isEditMode && id) {
      reset({
        ...cabinData,
        maxCapacity: cabin["max_capacity"],
        regularPrice: cabin["regular_price"],
        image: cabin.image
      });
    }
  }, [id, isEditMode, reset]);

  if(isPendingDetails) return <Spinner />
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, (errors)=>console.log(errors))} type={type}>
        <FormControl 
          label="Cabin name"
          error={errors?.name?.message}
        >
          <Input type="text" id="name" {...register("name", { required: "This field is required" })}/>
        </FormControl>

        <FormControl
          label="Max capacity"
          error={errors?.maxCapacity?.message}
        >
          <Input type="number" id="maxCapacity" {...register("maxCapacity", { 
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1"
            },
            })}/>
        </FormControl>

        <FormControl
          label="Regular price"
          error={errors?.regularPrice?.message}
        >
          <Input type="number" id="regularPrice" {...register("regularPrice", { 
            required: "This field is required" 
            ,
            min: {
              value: 1,
              message: "Regular price should be at least 1"
            }
            })}/>
        </FormControl>

        <FormControl
          label="Discount"
          error={errors?.discount?.message}
        >
          <Input type="number" id="discount" defaultValue={0} {...register("discount", { 
            required: "This field is required",
            validate: (value) => value <= getValues().regularPrice || "Discount should be less than or equal to regular price"
          })}/>
        </FormControl>

        <FormControl
          label="Description for website"
          error={errors?.description?.message}
        >
          <Textarea type="number" id="description" defaultValue="" {...register("description", { required: "This field is required" })}/>
        </FormControl>

        <FormControl
          label="Cabin photo"
          error={errors?.image?.message}
        >
          <FileInput 
            id="image" 
            accept="image/*"
            {...register("image", { required: isEditMode ? false : "This field is required" })} 
          />
        </FormControl>

        <FormControl>
          {/* type is an HTML attribute! */}
          {/* <Button variant="secondary" to="/cabins">
            Go Back
          </Button> */}

          <Button disabled={isUpdating}>{ isEditMode ? 'Update' : 'Add'} Cabin</Button>
        </FormControl>
      </Form>
    </>
  );
}

export default CreateCabinForm;
