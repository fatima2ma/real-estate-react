import styled from "styled-components";
import { useEffect } from "react";
import './loading.css';

function Loading (tree){
    // console.log(tree.tree);
    useEffect(() => {
        const loading_divs = document.querySelectorAll(`.${tree.tree.title}`);
        //console.log(loading_divs);
        [...loading_divs].map(loading_div => {
            const elem = checkParents(loading_div);
            if(elem){
                if(elem.classList.contains('loading_done')) return;
                if(elem.classList.contains('LoadingWrapp'))
                    initLoadingElements(tree.tree, elem);
                elem.classList.add('loading_done');
            }
            else 
                console.log('elem not card');
        })

        function initLoadingElements(tree, doc){
            const parent = doc.querySelector('.loading');
            // if(!parent.classList.contains(tree.title)) return;
            for(const elem in tree){
                if(tree[elem].hasOwnProperty('items')){
                    createElem(`div.${elem} ${tree[elem].type}`, parent);
                    tree[elem].hasOwnProperty('items') && tree[elem].title && createElem(`div.title`, `.${tree[elem].type}`, doc);
                    for(let i=0; i<tree[elem].items; i++){
                        createElem('div.listItem', `.${tree[elem].type}`, doc);
                    }
                }
                else
                    tree[elem] && createElem(`div.${elem}`, parent);
            }
        };
        
        function createElem(elem, parent, doc){
            const elemName = elem.split('.');
            const elem_ = document.createElement(elemName[0]);
            elem_.classList.add(...elemName[1].split(' '), 'loadAnim');
            const parent_elem = typeof(parent) == 'string' ? doc.querySelector(parent) : parent;
            parent_elem.appendChild(elem_);
        }

        function checkParents(elem){
			if(elem.classList.contains('LoadingWrapp')) return elem;
			while(elem.parentElement){
				if(elem.parentElement.classList.contains('LoadingWrapp'))
					return elem.parentElement;
				elem = elem.parentElement;
			}
		};
    },[tree]);

    return(
        <div className="loading"></div>
    )
};

export default Loading;