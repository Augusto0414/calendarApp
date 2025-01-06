import { useEffect, useMemo, useState, ChangeEvent } from "react";

type FormValidations<T> = {
  [K in keyof T]?: [(value: T[K]) => boolean, string];
};

type FormValidationState<T> = {
  [K in keyof T as `${string & K}Valid`]?: string | null;
};

export const useForm = <T extends Record<string, any>>(
  initialForm: T = {} as T,
  formValidations: FormValidations<T> = {}
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<FormValidationState<T>>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    return Object.values(formValidation).every((value) => value === null);
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const tempFormCheckedValues: { [key: string]: string | null } = {};

    for (const formField in formValidations) {
      const [fn, errorMessage] = formValidations[formField]!;
      tempFormCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(tempFormCheckedValues as FormValidationState<T>);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
