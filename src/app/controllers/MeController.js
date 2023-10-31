const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseData = Course.find().lean();

        if (req.query.hasOwnProperty('_sort')) {
            courseData = courseData.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            courseData,
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses.hbs', {
                    deletedCount: deletedCount,
                    courses: courses,
                });
            })
            .catch(next);
    }
    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then(courses => {
                res.render('me/trash-courses', { courses });
            })
            .catch(error => {
                next(error);
            });
    }
}

module.exports = new MeController();
