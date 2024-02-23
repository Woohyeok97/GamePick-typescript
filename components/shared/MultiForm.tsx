import { Children, cloneElement } from "react";
// type
import { FieldError, FieldErrors } from "react-hook-form";

interface MutltiFormProps {
  children: React.ReactElement[];
  onSubmit: () => void;
  errors: FieldErrors;
}
export default function MutltiForm({ children, onSubmit, errors }: MutltiFormProps) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {Children.map(children, child => {
        if (child.props.label) {
          return cloneElement(child, { ...child.props, error: errors[child.props.label] });
        }
        return child;
      })}
    </form>
  );
}

// 텍스트 필드
interface TextFieldProps {
  label: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}
MutltiForm.TextField = ({ label, fieldProps, error }: TextFieldProps) => {
  return (
    <div className='form__block'>
      <label htmlFor={label}></label>
      <input type="text" id={label} { ...fieldProps } />
      {error && <p className="form__label-warning">{error.message}</p>}
    </div>
  );
}

// 날짜 필드
interface DateFieldProps {
  label: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}
MutltiForm.DateField = ({ label, fieldProps, error }: DateFieldProps) => {
  return (
    <div className='form__block'>
      <label htmlFor={label}></label>
      <input type="date" id={label} { ...fieldProps } />
      {error && <p className="form__label-warning">{error.message}</p>}
    </div>
  );
}

// 파일 필드
interface FileFieldProps {
  label: string;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
}
MutltiForm.FileField = ({ label, fieldProps, error }: FileFieldProps) => {
  return (
    <div className='form__block'>
      <label htmlFor={label}></label>
      <input type="file" id={label} { ...fieldProps } />
      {error && <p className="form__label-warning">{error.message}</p>}
    </div>
  );
}

// textarea 필드
interface TextareaFieldProps {
  label: string;
  fieldProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  error?: FieldError;
}
MutltiForm.TextareaField = ({ label, fieldProps, error }: TextareaFieldProps) => {
  return (
    <div className='form__block'>
      <label htmlFor={label}></label>
      <textarea 
        spellCheck={false}
        id={label}
        { ...fieldProps }
      />
      {error && <p className="form__label-warning">{error.message}</p>}
    </div>
  );
}


