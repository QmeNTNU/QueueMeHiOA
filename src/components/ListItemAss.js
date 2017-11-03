import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { addSubject } from '../actions';


class ListItemAss extends Component {


  /* eslint-disable global-require */


  onAddPress() {
    //checks if subject is already added. could skip this if used set, and not push when regisering

    const { emnekode, emnenavn } = this.props.subject;

    //gets user uid
    const userUID = firebase.auth().currentUser.uid;
    //makes a ref for favstudsubject
    const { ref } = firebase.database().ref(`users/${userUID}/favasssubject/${emnekode}`);
    //adds subject to subjectlist
    this.props.addSubject({ ref, emnekode, emnenavn });

  }


  checkIfAdded() {
    //only diplays a add-button if it is not already addet to the users favorite subjects
    console.log('favor', this.props.favoriteAssSubjectList);
    const { emnekode } = this.props.subject;
    for (let i = 0; i < this.props.favoriteAssSubjectList.length; i++) {
      if (emnekode === this.props.favoriteAssSubjectList[i].emnekode) {
        return true;
      }
    }
    return false;
}

renderImage() {
  if (this.checkIfAdded()) {
  return (

      <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/emptydontadd.png')}
      />

  );
}
return (

    <Image
    style={{ flex: 1, height: undefined, width: undefined }}
    resizeMode="contain"
    source={require('./images/add.png')}
    />


);
}

renderRow() {
  const { emnekode, emnenavn } = this.props.subject;

    return (
      <View style={styles.columnStyle}>

        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{emnenavn}</Text>
          <Text>{emnekode}</Text>
        </View>

        <View style={styles.arrowStyle}>
          <TouchableOpacity onPress={this.onAddPress.bind(this)} style={{ flex: 1 }}>
          {this.renderImage()}
        </TouchableOpacity>
        </View>


    </View>
    );
}

  render() {
    return (
    this.renderRow()
  );
  }
}
/* eslint-enable global-require */

const styles = {
  columnStyle: {
    flex: 10,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },

  thumbnailContainerStyle: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 10,
  },
  arrowStyle: {
    flex: 1,
    padding: 0
  },
  imageStyle: {
    height: 60,
    width: 60,
    alignSelf: 'center'
  },
  headerContentStyle: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  headerTextStyle: {
    fontFamily: 'bebasNeue',
    fontSize: 30,
    color: '#213140'

  },
};
const mapStateToProps = state => {
  //fungerer ikke å kalle på denne. vet ikke hvorfor
  //MARIUS MÅ UANSETT HENTE UT AVORITTFAG I EN REDUCERSÅ KAN JO BARE BRUKE DE!!!
  const favoriteAssSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  return { favoriteAssSubjectList };
};

export default connect(mapStateToProps, { addSubject })(ListItemAss);
