import React from 'react';

//to do : use it for error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorFound: false };
  }

  static getDerivedStateFromError(error) {

    return { hasError: true };
  }

  componentDidCatch(error, errorDetails) {
    console.log(error, errorDetails);
  }

  render() {
    if (this.state.hasError) {
      return <h2>An error occurred in the application</h2>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;