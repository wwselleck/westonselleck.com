import * as React from 'react';

class Index extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => console.log('hi')} >Whoa</button>
            </div>
        )
    }
}

export const Component = Index;
