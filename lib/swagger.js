/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: "----- 1. -----  Get all user"
 *      responses:
 *        '200':
 *          description: "회원명단"
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                idAcc:
 *                  type: integer
 *                  description: IdAcc
 *                username:
 *                  type: string
 *                  description: username
 *                name:
 *                  type: string
 *                  description: 이름
 *                job:
 *                  type: string
 *                  description: 작업
 *           
 */

/**
 * @swagger
 * /api/check-login:
 *  post:
 *      summary: "----- 2. -----  로그인"
 *      description: "Check login. <br/> Output url: /check-login/output <br/> Access Token 만료: 10조 (TEST); Refresh Token 만료: 1일; <br/> 로그인  10조 후 accessToken 재발급하기 위해 /accessTokenAgain에 접속해야 한다" 
 *      parameters:
 *       - name: username
 *         description: "username"
 *         in: formData
 *         type: string
 *       - name: password
 *         description: "username"
 *         in: formData
 *         type: string
 *      responses:
 *        '200':
 *          description: "Login success"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "login success"
 *        '400':
 *          description: "Login fail"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "Login fail"
 */



/**
 * @swagger
 * /api/accessTokenCheck:
 *   get:
 *     summary: "----- 3. -----  Check access Token"
 *     description: "AccessToken 확인" 
 *     responses:
 *         '200':
 *          description: "access토큰 존재"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "Login success"
 *         '400':
 *          description: "access토큰이 정의되지 않다"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "Login fail"
 */
/**
 * @swagger
 * /api/accessTokenAgain:
 *   get:
 *     summary: "----- 4. -----  access 토큰 재발급"
 *     description: "access 토큰 재발급" 
 *     responses:
 *         '200':
 *          description: "access토큰 재발급되었다"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "access토큰 재발급되었다"
 *         '400':
 *          description: "access 토큰이 정의되지 않다"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "Login fail"
 */

/**
 * @swagger
 * /api/add:
 *  post:
 *      summary: "----- 5. -----  Add member "
 *      description: "Add member . <br/> Output url: /add/output" 
 *      parameters:
 *       - name: username
 *         description: "username"
 *         in: formData
 *         type: string
 *       - name: name
 *         description: "name"
 *         in: formData
 *         type: string
 *       - name: password
 *         description: "job"
 *         in: formData
 *         type: string
 *       - name: password
 *         description: "job"
 *         in: formData
 *         type: string
 *      responses:
 *        '200':
 *          description: "Add success"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "Add success"
 *        '201':
 *          description: "오류 - 유저 존재 "
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "user exist"
 *        '400':
 *          description: "Login fail"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "Login fail"
 *        '401':
 *          description: "Add fail"
 *          schema:
 *           type: object
 *           properties:
 *            message:
 *             type: string
 *             example: "Add fail"
 */

