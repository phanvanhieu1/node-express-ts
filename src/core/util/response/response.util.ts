class ResponseUtils {
  public success(data: any) {
    return {
      data,
    };
  }
}

export default new ResponseUtils();
