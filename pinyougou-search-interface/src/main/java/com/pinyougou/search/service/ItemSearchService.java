package com.pinyougou.search.service;

import java.util.List;
import java.util.Map;

/**
 * @author HJX
 * @create 2023-11-13 21:49
 */
public interface ItemSearchService {
    /*
    * 搜索
    * */

    public Map<String,Object> search(Map searchMap);

    /**
     * 导入数据
     * @param list
     */
    void importList(List list);

    void deleteByGoodsIds(Long[] goodsIds);
}
