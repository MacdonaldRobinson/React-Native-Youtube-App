import React from 'react';
import PropTypes from 'prop-types'
import { ScrollView, View, Text, Button, TextInput, Image, Modal, TouchableHighlight, WebView } from 'react-native';

class RenderItem extends React.Component 
{
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress(e) {
        const newState = {
            isModalVisiable: true,
            selectedItem: this.props.currentItem
        };

        this.props.updateRootState(newState);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPress}>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', padding: 5, marginTop: 5 }}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: this.props.currentItem.snippet.thumbnails.default.url }} style={{ width: this.props.currentItem.snippet.thumbnails.default.width, height: this.props.currentItem.snippet.thumbnails.default.height }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.currentItem.snippet.title}</Text>
                        <Text>{this.props.currentItem.snippet.description}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

function PreviewPanel(props) 
{
    if (props.rootState.canSearch) {
        return (
            <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Below are search resilts for: '{props.rootState.searchText}' </Text> 
            {
                    props.rootState.items.map((item, index) =>                        
                        <View key={'video_' + index.toString()}>
                            <RenderItem currentItem={item} rootState={props.rootState} updateRootState={props.updateRootState} /> 
                        </View>
                    )
            } 
            </View>
        );
    }
                
    return null;
}
                
class SearchBar extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.YoutubeApiUrl = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAKgHLx_jXrDfIwzHMR5E--BipBEjeiU_4&part=snippet";
        this.onChangeText = this.onChangeText.bind(this);
        this.onPress = this.onPress.bind(this);
    }
                    
    onChangeText(e) 
    {

        const newState = {
            searchText: e,
            canSearch: false,
            items: this.props.rootState.items
        }
                
        this.props.updateRootState(newState);
    }
                
    onPress(e) 
    {
        const url = this.YoutubeApiUrl + "&q=" + this.props.rootState.searchText;
                    
        console.log("Attempting to fetch from youtube ...");

        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            console.log("Successfully loaded data from youtube");
            //console.log(responseJson);
            console.log("Updating state");

            const newState = {
                canSearch: true,
                items: responseJson.items,
                searchText: this.props.rootState.searchText
            }
            
            this.props.updateRootState(newState);
        });
        
            }
        
    render() {
        return (
            <View style={{ flex: 0.2, flexDirection: 'row', padding: 30 }}>
                <View style={{ flex: 2 }} >
                    <TextInput text={this.searchText} style={{ padding: 10 }} onChangeText={this.onChangeText} onSubmitEditing={this.onPress}/>
                </View>
                <View style={{ flex: 1 }}>
                    <Button title='Go' onPress={this.onPress}/>
                </View>
            </View>
            );
        }
    }
                            
class ModalWindow extends React.Component 
{
        constructor(props) {
            super(props);
            this.onPress = this.onPress.bind(this);
        }
                            
        onPress() 
        {
            const newState = { isModalVisiable: false };                        
            this.props.updateRootState(newState);
        }
                        
        render() 
        {
            console.log("ModalWindow");
            console.log(this.props.rootState.selectedItem);

            return ( 
                <Modal onRequestClose={this.props.onModalRequestClose} visible={this.props.rootState.isModalVisiable} animationType="slide">
                    <View style={{ flex: 1, marginTop: 50 }}> 
                        { (this.props.rootState.selectedItem != null) ? <WebView source={{ uri: "https://www.youtube.com/embed/" + this.props.rootState.selectedItem.id.videoId }} style={{ flex: 1, height: 100 }}/> : null } 
                        <Button title='Close' onPress={this.onPress} />
                    </View>
                </Modal>
                );
            }
        }
                            
        export default class MyApp extends React.Component 
        {
            constructor(props) 
            {
                super(props);
                this.state = { 
                    searchText: '',
                    canSearch: false,
                    items: [],
                    isModalVisiable: false,
                    selectedItem: null
                };
                        
                this.onModalRequestClose = this.onModalRequestClose.bind(this);
            }
                            
            updateRootState(newState) 
            {

                const stateCopy = {};
                                
                for (var key in this.state) 
                {
                    stateCopy[key] = (newState[key] != null) ? newState[key] : this.state[key];
                }
                                
                this.setState(stateCopy);
            }
                                
            onModalRequestClose() 
            {
                this.setState({
                    isModalVisiable: false
                });
            }
                                    
            render() 
            {
                return (
                    <View style={{ flex: 1 }}>
                        <ModalWindow rootState={this.state} onModalRequestClose={() => this.onModalRequestClose} updateRootState={(newState) => this.updateRootState(newState)} />
                        <View style={{ flex: 1 }}>
                            <SearchBar rootState={this.state} updateRootState={(newState) => this.updateRootState(newState)}/> 
                            <ScrollView style={{ flex: 2, backgroundColor: 'lightgray' }}>
                                <PreviewPanel rootState={this.state} updateRootState={(newState) => this.updateRootState(newState)}/>
                            </ScrollView>
                        </View>
                    </View>
                );
            }
        }