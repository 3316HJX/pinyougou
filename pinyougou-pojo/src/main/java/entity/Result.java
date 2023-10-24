package entity;

import java.io.Serializable;

/**
 * @author HJX
 * @create 2023-10-24 22:50
 * 返回结果封装
 */
public class Result implements Serializable {
    private boolean success;
    private String message;
    public Result(boolean success,String message){
        super();
        this.success=success;
        this.message=message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
