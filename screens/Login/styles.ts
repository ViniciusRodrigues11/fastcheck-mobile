import styled from 'styled-components/native'
import {Platform} from 'react-native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS == 'android' ? 150 : 40}px;
  background-color: white;
`;


export const Title = styled.Text`
    font-size: 24px;
    color: #666;
    margin: 64px 0 64px;
`;


export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #666;
  font-size: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
      color: #666;
      font-size: 16px;
      margin-left: 16px;
`;