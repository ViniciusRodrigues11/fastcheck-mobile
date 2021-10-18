import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { Container, TextInput, Icon } from './styles'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'


interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  cpfMask?: boolean;
  inputMaskChange?: any;
  containerStyle?: {},
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}


const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, cpfMask, inputMaskChange ,containerStyle = {}, ...rest }, ref) => {

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, seIsFilled] = useState(false)

  function cpfMaksChange(value: string) {
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return value;
  }

  function handleChange(text: string) {
      const value = cpfMaksChange(text);
      inputMaskChange(value);
  }

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    seIsFilled(!!inputValueRef.current.value)

  }, [])


  const inputElementRef = useRef<any>(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }))

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    })
  }, [fieldName, registerField])

  return (
    <Container style={containerStyle} isFocused={isFocused} isErroed={!!error}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#fc4a3a' : '#666'} />
      <TextInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
          if(cpfMask == true) {
            handleChange(value)
          }
        }}
        {...rest}
      />
    </Container>
  )

}

export default forwardRef(Input);
