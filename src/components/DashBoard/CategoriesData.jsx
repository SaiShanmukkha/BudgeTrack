import styles from "@/styles/Categories.module.css";
import { categoryIcons } from "../Utilities/constants";
import Loader from "../../components/Loader"
import { useCategories } from "../Utilities/useCategories";

export default function CategoriesData(){
    const categoriesInfo = useCategories();
    return (
        <div className={styles.CategoriesDataCard}>
            <h2 className={styles.CategoriesDataCardHeader}>Categories</h2>
            <div>
                {
                    categoriesInfo.isLoading ? <Loader /> : (categoriesInfo.categories.length > 0 ?
                    <div className={styles.CategoriesContent}>
                        {
                            categoriesInfo.categories.map((category) => {
                                return (
                                    <div key={category.id} className={styles.categoryTile}>
                                        <div className={`${styles.categoryItemIcon}`} >{categoryIcons[category.categoryName]}</div>
                                        {category.categoryName}
                                    </div>
                                );
                            })
                        }
                    </div> : <div className={styles.noCategories}>No Categories Data</div>)
                }
            </div>
        </div>
    );
}
