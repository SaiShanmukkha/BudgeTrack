import styles from "@/styles/Categories.module.css";
import { categoryIcons } from "../Utilities/constants";
import Loader from "../../components/Loader"

export default function CategoriesData(props){
    return (
        <div className={styles.CategoriesDataCard}>
            <h2 className={styles.CategoriesDataCardHeader}>Categories</h2>
            <div>
                {
                    props.loading ? <Loader /> : (props.categories.length > 0 ?
                    <div className={styles.CategoriesContent}>
                        {
                            props.categories.map((category) => {
                                return (
                                    <div key={category.id} className={styles.categoryTile}>
                                        <div className={`${styles.categoryItemIcon}`} >{categoryIcons[category.categoryName]}</div>
                                        {category.categoryName}
                                    </div>
                                );
                            })
                        }
                    </div> : <div className={styles.noCategories}>Not able to fetch data.</div>)
                }
            </div>
        </div>
    );
}
