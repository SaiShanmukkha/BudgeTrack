import styles from "@/styles/Categories.module.css";
import { categoryIcons } from "../Utilities/constants";

export default function CategoriesData(props){
    return (
        <div className={styles.CategoriesDataCard}>
            <h2 className={styles.CategoriesDataCardHeader}>Categories</h2>
            <div>
                {
                    props.categories != undefined ? 
                    <div className={styles.CategoriesContent}>
                        {
                            props.categories.map((category) => {
                                return (
                                    <div key={category.id} className={styles.categoryTile}>
                                        <div className={`${styles.categoryItemIcon}`} style={{'backgroundColor': '#bb45e6', 'border': '2px solid #560f70'}}>{categoryIcons[category.categoryName]}</div>
                                        {category.categoryName}
                                    </div>
                                );
                            })
                        }
                    </div> : <div>No Data Available</div>
                }
            </div>
        </div>
    );
}
