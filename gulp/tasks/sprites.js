var gulp = require('gulp');
var spriteSVG = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var deleting = require('del');
var svg2png = require('gulp-svg2png');

var config = {
    shape: {
        dimension: {
            precision: 0
        },
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSVGwithPNG: function () {
                    return function (sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function () {
    return deleting(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function () {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(spriteSVG(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPNGcopy', ['createSprite'], function () {
    return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./app/temp/sprite/css'))
})

gulp.task('copySpriteGraphic', ['createPNGcopy'], function () {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function () {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {
    return deleting('./app/temp/sprite');
})

gulp.task('icons', ['beginClean', 'createSprite', 'createPNGcopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
