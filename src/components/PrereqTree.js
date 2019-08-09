import React from "react";
import Tree from 'react-d3-tree';
import { PropTypes } from 'prop-types';
import { getPrerequsites } from '../actions/prereqActions';
import '../styles/Login.css';



class PrereqTree extends React.Component {
    componentWillMount() {
        const { subject, number} = this.props.routeParams;
        this.props.dispatch(getPrerequsites(subject, number));
    }

    computeChildren = (rule, rules, visited, queue) => {
        var children = [];
        for (var i = 0; i < rule.length; i++) {
            const curr_rule = rule[i];
            var copy = rule.slice(0);
            copy.shift();
            if (typeof curr_rule == 'number') {
                var sub_children = [...this.computeChildren(copy, rules, visited, queue)];
                children.push({
                        name: curr_rule + " of",
                        children: sub_children.slice(0),
                });
                break;
            } else if (typeof curr_rule == 'object') {
                if (typeof curr_rule[0] == 'string') {
                    children.push({
                        name: "",
                        children: [...this.computeChildren(curr_rule, rules, visited, queue)],
                    });
                } else {
                    children.push(...this.computeChildren(curr_rule, rules, visited, queue));
                }
            } else {
                if (!visited[curr_rule]) {
                    queue.push(curr_rule);
                }
                children.push({
                    name: curr_rule
                });
            }
        }
        return children;
    }

    computeNestedPrereqs = (list, visited, curr_visited = {}) => {
        if (!list || !list.length) {
            return;
        }
        for (var i = 0; i < list.length; i++) {
            if (curr_visited[list[i].name]) {
                continue;
            }
            if (visited[list[i].name]) {
                curr_visited[list[i].name] = true;
            }
            if (!list[i].children || !list[i].children.length) {
                if (visited[list[i].name]) {
                    list[i].children = JSON.parse(JSON.stringify(visited[list[i].name][0].children));
                    list[i]._collapsed = true;
                }
            }
            this.computeNestedPrereqs(list[i].children, visited, curr_visited);
            if (visited[list[i].name]) {
                curr_visited[list[i].name] = false;
            }
        }
    }

    getTreeDataWithKey = (key, rules) => {
        var visited = {};
        var queue = [];

        queue.push(key);

        // Do BFS
        while (queue.length) {
            var front = queue.shift();
            var curr_rule = (rules[front] ? rules[front] : []).slice(0);
            var result = [{
                name: front, 
                children: rules[front] ? [...this.computeChildren(curr_rule, rules, visited, queue)] : []
            }];
            visited[front] = [...result];
        }
        this.computeNestedPrereqs(visited[key][0].children, visited);

      
        return visited[key];
    }

    getTreeData() {
        const { rules } = this.props;
        if (!rules ||  Object.entries(rules).length === 0) {
            return [];
        }
        const { subject, number } = this.props.routeParams;

        let key = subject.toUpperCase() + number;
        return this.getTreeDataWithKey(key, rules);
    }   
    render() {
        const myTreeData = this.getTreeData();
        const { rules } = this.props;
        if (Object.entries(rules).length === 0 && rules.constructor === Object) {
            return null ;
        }
        const isDataPresent = (myTreeData && myTreeData.length > 0);
        return (
                {isDataPresent} && 
                <div style={{width: "100%", height:"100%"}}>
                    <Tree data={myTreeData} zoomable={true} translate={{x: 30, y: 200}} useCollapseData={true} onClick={this.onClick} />
                </div>
            
        );
    }
};

PrereqTree.propTypes = {
    rules: PropTypes.object,
};

export default PrereqTree;

