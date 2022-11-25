import { Advantages, Htag, P, Tag, Sort, Product } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import { HhData } from "../../components/HhData/HhData";
import { TopLevelCategory } from "../../interfaces/toppage.interface";
import { SortEnum } from '../../components/Sort/Sort.props'
import { useEffect, useReducer, useState } from "react";
import { sortReducer } from "./sort.reducer";
import { useScrollY } from "../../hooks/useScrollY";
import { useReducedMotion } from "framer-motion";

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    
    const [{ products: sortedProducts }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating  });
    const shouldReduceMotion = useReducedMotion();
    

    const setSort = (sort: SortEnum) => {
        dispathSort({ type: sort});
    }

    useEffect(() => {
        dispathSort({type: 'reset', initialState: products})
    },[products])



    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag color="grey" size="m" aria-label={products.length + 'элементов'}>{products.length}</Tag>}
                <Sort sort={SortEnum.Rating} setSort={setSort}/>
            </div>
            <div role="list">
                {sortedProducts && sortedProducts.map(p => (
                    <Product layout={shouldReduceMotion ? false : true} key={p._id} product={p} />
                ))}

            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">{page.category}</Htag>
                <Tag color="red" size="m">hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag='h2'>Перимущества</Htag>
                <Advantages advantages={page.advantages} />
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag> )}
        </div>
    )
};