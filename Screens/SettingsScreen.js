import React from 'react'
import { Icon, Button, Container, Content, Header, Left, Text, Footer, Body, Title } from 'native-base';

export class SettingsScreen extends React.Component 
{
  render() 
  {
    return (
        <Container>
            <Header>
                <Text style={{ color:'white', fontSize: 16, fontWeight: 'bold' }}>Settings Screen</Text>
            </Header>        
            <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text>Settings Screen</Text>
            </Content>
            <Footer>

            </Footer>
        </Container>
    )
  }
}
