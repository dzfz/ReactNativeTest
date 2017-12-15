/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

var ReactNativeTest = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let titleArray = getData();
        return {
            dataSource: ds.cloneWithRows(titleArray),
        };
    },
    render: function() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        );
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function getData(){
    fetch('http://apis.baidu.com/apistore/wooyun/unclaim?limit=10', {
        method: 'POST',
        headers: {
            'apikey': '9257b766dbe92c7ef1f2191e915ca015',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.text())
        .then((responseText) => {
            let obj = JSON.parse(responseText);
            let titleArray = [];
            for (var o of obj) {
                console.log(o.title);
                titleArray.push(o.title)
            }
            console.log(obj.length);
            return titleArray;
        })
        .catch((error) => {
            console.warn(error);
        });
}



AppRegistry.registerComponent('ReactNativeTest', () => ReactNativeTest);
