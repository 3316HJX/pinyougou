package com.pinyougou.search.service;

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
}
