import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import {IssueProps} from '../data/Interfaces'

class IssueCard extends React.Component<IssueProps> {
    render() {
        return (
            <Card className="PaddedCard">
                <Card.Body>
                    <Card.Title>{this.props.issue.name}</Card.Title>
                    <Card.Subtitle>{this.props.issue.repo}</Card.Subtitle>
                    <Card.Text className="PaddedTicketDesc">{this.props.issue.description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default IssueCard;