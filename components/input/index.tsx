import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { Container, TextInput, Icon } from './styles'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'


interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {},
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}


const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, containerStyle = {}, ...rest }, ref) => {

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, seIsFilled] = useState(false)


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
        }}
        {...rest}
      />
    </Container>
  )

}

export default forwardRef(Input);
