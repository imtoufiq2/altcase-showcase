import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../atoms/button/Button";
import OptionButton from "../../atoms/optionButton";
import OptionHeading from "../../atoms/optionHeading";
import OptionHeader from "../../molecules/optionHeader";
import useBackgroundColor from "../../../customHooks/useBackgroundColor";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getData } from "../../../utils/Crypto";
import { useNavigate } from "react-router-dom";


const PersonalInfo = () => {
  const navigate=useNavigate()
  const initialValues = {
    is_indian_resident: 0,
    is_married: 1,
    gender: "female",
    place_of_birth: "Mumbai",
    isChecked: false,
  };
const [getApiResponse , setGetApiResponse]=useState(initialValues)


  const handleGetCall = useCallback(async () => {
    console.warn("It's me");
try {
  const response = await axios.post(
    "https://altcaseinvestor.we3.in/api/v1/profile",
    {
     
      display_location: "PersonalInfo",
      method: "Get",
      investor_id: getData("userData")?.investor_id,
    },
  );
  console.log("response", response?.data?.data)
  setGetApiResponse({...response?.data?.data , isChecked:false })

} catch (error) {
  
}
  }, []);

  useEffect(() => {
    handleGetCall(); 
  }, [handleGetCall]); 
  useBackgroundColor();
  
  const validationSchema = Yup.object({
    place_of_birth: Yup.string().required("Place of Birth is required"),
    isChecked: Yup.bool().oneOf(
      [true],
      "You must authorize the bank to continue",
    ),
  });

  const handleSubmit = async(values, { resetForm }) => {
   console.log(values)

   try {
    const response = await axios.post(
      "https://altcaseinvestor.we3.in/api/v1/invest/updatepersonalinfo",
      {
       
        fd_investment_id: 417,
        gender: values?.gender,
        investor_id: 174,
        is_indian_resident: values?.is_indian_resident    ,
        is_married: values?.is_married,
        is_personal_info_done: 1,
        place_of_birth: values?.place_of_birth

      },
    );
    console.log("daresponseta",response?.data)
    if(response?.data?.status ===200 && response?.data?.message ==="success"){
      navigate("/user-address")
    }
   } catch (error) {
    
   }
    resetForm();
  };

  return (
    <div className="mx-auto mb-8 px-6 mt-8 flex max-w-[1008px] flex-col gap-5  md:gap-7 w-full sm:max-w-[592px]">
      <OptionHeader
        title="Personal Info"
        subTitle="Choose what best defines you. Your FD will be made under this information."
      />
      <Formik
        initialValues={getApiResponse}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        // validateOnBlur={false}
        // validateOnChange={false}
        enableReinitialize
      >
        {({
          values,
          setFieldValue,
          setFieldTouched,
          setFieldError,
          errors,
          touched,
        }) => (
          <Form className="flex flex-col gap-6 rounded-xl  md:border-[0.5px] md:bg-white md:p-8">
            <div id="_ResidentStatus" className="flex flex-col gap-3 md:gap-4">
              <OptionHeading text="Resident Status" />
              <div id="_options" className="flex flex-wrap items-center gap-3">
                <OptionButton
                  text="Indian Resident"
                  isActive={values.is_indian_resident === 1 && "Indian Resident"}
                  onClick={() =>
                    setFieldValue("residentStatus", "Indian Resident")
                  }
                />
                <OptionButton
                  text="Non-Indian Resident (NRI)"
                  // isActive={
                  //   values.residentStatus === "Non-Indian Resident (NRI)"
                  // }
                  isActive={values.is_indian_resident === 0 && "Non-Indian Resident (NRI)"}
                  onClick={() =>
                    setFieldValue("residentStatus", "Non-Indian Resident (NRI)")
                  }
                />
              </div>
            </div>
            <div
              id="_MaritalStatusGender"
              className="flex flex-col gap-6 md:flex-row md:gap-10"
            >
              <div id="_left"  className="flex flex-col gap-3 md:gap-4">
                <OptionHeading text="Marital Status" />
                <div
                  id="_options"
                  className="flex flex-wrap items-center gap-3"
                >
                  <OptionButton
                    text="Married"
                    isActive={values.is_married ===1 && "Married"}
                    // isActive={values.maritalStatus === "Married"}
                    onClick={() => setFieldValue("maritalStatus", "Married")}
                  />
                  <OptionButton
                    text="Unmarried"
                    // isActive={values.maritalStatus === "Unmarried"}
                    isActive={values.is_married ===0 && "Unmarried"}
                    onClick={() => setFieldValue("maritalStatus", "Unmarried")}
                  />
                </div>
              </div>
              <div id="_right"  className="flex flex-col gap-3 md:gap-4">
                <OptionHeading text="Gender" />
                <div
                  id="_options"
                  className="flex flex-wrap items-center gap-3"
                >
                  <OptionButton
                    text="Male"
                    // isActive={values.gender === "Male"}
                    isActive={values.gender ==="Male" && "Male"}
                    onClick={() => setFieldValue("gender", "Male")}
                  />
                  <OptionButton
                    text="Female"
                    // isActive={values.gender === "Female"}
                    isActive={values.gender === "Female" && "Female"}
                    onClick={() => setFieldValue("gender", "Female")}
                  />
                </div>
              </div>
            </div>
            <div id="_placeOfBirth"  className="flex flex-col gap-[6px]">
              <h4 className="medium-text text-sm leading-6 tracking-[-0.2] text-[#3D4A5C]">
                Place of Birth
              </h4>
              <Field
                name="place_of_birth"
                type="text"
                className="medium-text tracking-[-0.2]text-[#1B1B1B] max-h-[2.875rem] w-full rounded-md border px-[14px] py-[11px] text-sm leading-6 outline-none"
                onChange={(e) => {
                  setFieldValue("place_of_birth", e.target.value);
                  if (touched.place_of_birth && errors.place_of_birth) {
                    setFieldTouched("birthPlace", true, false);
                    setFieldError("birthPlace", "");
                  }
                }}
                onBlur={() => setFieldTouched("place_of_birth", true)}
              />
              <ErrorMessage
                name="place_of_birth"
                component="div"
                className="text-xs text-red-500"
              />
            </div>
            <div id="_checkbox" className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <Field
                  type="checkbox"
                  name="isChecked"
                  className="min-h-4 min-w-4 p-4 accent-[#00a700]"
                  onChange={(e) => {
                    setFieldValue("isChecked", e.target.checked);
                    if (touched.isChecked && errors.isChecked) {
                      setFieldTouched("isChecked", true, false);
                      setFieldError("isChecked", "");
                    }
                  }}
                  onBlur={() => setFieldTouched("isChecked", true)}
                />
                <p className="regular-text text-xs leading-5 tracking-[-0.2] text-[#2D3643]">
                  I hereby authorize Utkarsh Small Finance Bank Ltd to fetch my
                  documents from UIDAI to setup my fixed deposit account.
                </p>
              </div>
              <ErrorMessage
                name="isChecked"
                component="div"
                className="text-xs text-red-500"
              />
            </div>
            <div id="_button" className="flex items-center gap-5">
              <Button
                label="Go Back"
                className="medium-text hidden max-h-12 rounded-md border border-[#55D976] text-base leading-7 tracking-[-0.3] text-[#21B546] active:scale-[0.99] md:block"
              />
              <Button
                label="Continue"
                type="submit"
                className="medium-text max-h-12 bg-[#21B546] text-base leading-7 tracking-[-0.3] text-white active:scale-[0.99]"
              />
            </div>
          </Form>
        )}
      </Formik>
      {/* <div id="spacing" className="h-16"/> */}

    </div>
  );
};

export default PersonalInfo;
