import React from 'react';
import PrivateHeader from './PrivateHeader';

// export default () => {
//      return (
//        <div>
//                      <PrivateHeader title="Your links"/>
//                      <LinksList/>
//                      <Addlink/>
//        </div>
//      )
// }

export default class Lnk extends React.Component {
  componentWillMount() {
       if (!Meteor.userId())
           this.props.history.replace('/');
   }

  render() {
    return (
         <div>
              <PrivateHeader title="Dashboard"/>
                <div className="page-content">
                    Dashboard page content
               </div>
         </div>
    )
  }
}
